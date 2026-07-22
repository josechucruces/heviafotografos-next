import sharp from "sharp";
import fs from "fs";
import path from "path";

const imgDir = path.join(process.cwd(), "public", "content", "img");
const maxWidth = 1600;
const quality = 80;

function findLargeFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findLargeFiles(fullPath));
    } else if (
      entry.name.endsWith(".webp") &&
      !entry.name.startsWith("_") &&
      fs.statSync(fullPath).size > 400 * 1024
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimize(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const oldSize = fs.statSync(filePath).size;

  if (metadata.width > maxWidth) {
    await image
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(filePath + ".tmp");
    fs.renameSync(filePath + ".tmp", filePath);
    const newSize = fs.statSync(filePath).size;
    console.log(
      `  ${path.basename(filePath)}: ${metadata.width}px→${maxWidth}px, ${(oldSize / 1024).toFixed(0)}KB→${(newSize / 1024).toFixed(0)}KB`
    );
  } else {
    await image
      .webp({ quality })
      .toFile(filePath + ".tmp");
    fs.renameSync(filePath + ".tmp", filePath);
    const newSize = fs.statSync(filePath).size;
    console.log(
      `  ${path.basename(filePath)}: re-encoded Q${quality}, ${(oldSize / 1024).toFixed(0)}KB→${(newSize / 1024).toFixed(0)}KB`
    );
  }
}

async function main() {
  const files = findLargeFiles(imgDir);
  console.log(`Found ${files.length} large images`);
  for (const file of files) {
    await optimize(file);
  }

  const coverImg = path.join(imgDir, "web", "fotografos_comunion_asturias.webp");
  if (fs.existsSync(coverImg)) {
    const oldSize = fs.statSync(coverImg).size;
    await sharp(coverImg)
      .resize({ width: 800 })
      .webp({ quality: 75 })
      .toFile(coverImg + ".tmp");
    fs.renameSync(coverImg + ".tmp", coverImg);
    const newSize = fs.statSync(coverImg).size;
    console.log(`  fotografos_comunion_asturias.webp: forced to 800px, ${(oldSize / 1024).toFixed(0)}KB→${(newSize / 1024).toFixed(0)}KB`);
  }
}

main().catch(console.error);
