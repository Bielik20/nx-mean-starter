export interface PaginationState {
  end: boolean;
  ids: string[];
}

export const initialState: PaginationState = {
  end: false,
  ids: [],
};
