export interface Note {
  id: string;
  content: string;
}

export interface Call {
  id: string;
  call_type: string;
  created_at: string;
  direction: string;
  from: string;
  duration: number;
  is_archived: boolean;
  notes: Note[];
  to: string;
  via: string;
}

export interface PaginatedCallsResponseType {
  paginatedCalls: {
    nodes: Call[];
    totalCount: number;
  };
}

export interface CallDetailsResponseType {
  call: Call;
}

export interface AddCallNoteInput {
  activityId: string;
  content: string;
}
