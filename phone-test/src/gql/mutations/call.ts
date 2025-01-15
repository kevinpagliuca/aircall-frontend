import { gql, TypedDocumentNode } from '@apollo/client';
import { AddCallNoteInput } from '../../interfaces/call';

export const ARCHIVE_CALL: TypedDocumentNode<undefined, { id: string }> = gql`
  mutation archiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`;

export const ADD_CALL_NOTE: TypedDocumentNode<undefined, { input: AddCallNoteInput }> = gql`
  mutation addNote($input: AddNoteInput!) {
    addNote(input: $input) {
      id
    }
  }
`;
