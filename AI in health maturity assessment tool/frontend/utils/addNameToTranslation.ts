const addNameToTranslation = (key: string, name: string): string => {
  if (name && name !== undefined) return `${key}WithName`;

  return key;
};

export default addNameToTranslation;
