export type Gesture = {
  name: string;
  score: number;
  recognized: boolean;
  path: {
    start: number[];
    end: number[];
    centroid: number[];
  };
  ranking: {
    name: string;
    score: number;
  }[];
};
