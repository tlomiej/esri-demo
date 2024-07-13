export const formatString = (input: string): string => {
  return input.replace("{", "").replace("}", "").split(",").join(", ");
};

export const formatAddressName = (
  city: string,
  street?: string,
  number?: string
) => {
  return `${city}${street ? ", " : ""}${street ? street : ""} ${
    number ? number : ""
  }`;
};
