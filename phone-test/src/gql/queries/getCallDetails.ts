import { gql, TypedDocumentNode } from '@apollo/client';
import { CALL_FIELDS } from '../fragments';
import { CallDetailsResponseType } from '../../interfaces/call';

export const GET_CALL_DETAILS: TypedDocumentNode<CallDetailsResponseType, { id: string }> = gql`
  ${CALL_FIELDS}
  query Call($id: ID!) {
    call(id: $id) {
      ...CallFields
    }
  }
`;
