export type BlogType = {
  _id: string;
  title: string;
  content: string;
};

export type BlogResponseType = {
  data: BlogType[];
  pagination: {
    totalPages: number;
    first: boolean;
    last: boolean;
  };
};
