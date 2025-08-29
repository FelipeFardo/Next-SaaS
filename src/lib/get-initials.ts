export function getIniciais(name:string) {
  const partes = name.trim().split(/\s+/);
  
  const primeira = partes[0][0].toUpperCase();
  
  const ultima = partes[partes.length - 1][0].toUpperCase();
  
  return primeira + ultima;
}