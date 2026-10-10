export function isValidNamePatient(name: string) {
  const regex = /^[\p{L}\s]+$/u;
  return regex.test(name);
}

export function calulateAge(fechaNacimiento: Date): number {
  const today = new Date();
  const bornDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - bornDate.getFullYear();
  const month = today.getMonth() - bornDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < bornDate.getDate())) {
    age--;
  }
  return age;
}
