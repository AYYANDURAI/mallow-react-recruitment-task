export const filterUser = (
  data: any,
  searchTerm: string,
  page: any,
  pageSize: any
) => {
  const filteredUsers = data?.filter((user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return filteredUsers;
};
export const firstAndLastNameRules = [
  {
    required: true,
    message: "First name is required!",
  },
  {
    min: 2,
    message: "First name must be at least 2 characters long!",
  },
  {
    pattern: /^[A-Za-z]+$/,
    message: "First name must contain only letters!",
  },
];

export const imageRules = [
    {
      required: true,
      message: "Image URL is required!",
    },
    {
      pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
      message: "Please enter a valid image URL (e.g., .png, .jpg, .jpeg, .gif, .bmp)!",
    },
  ];