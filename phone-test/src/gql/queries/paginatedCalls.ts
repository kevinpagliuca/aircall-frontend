import { gql, TypedDocumentNode } from '@apollo/client';
import { CALL_FIELDS } from '../fragments';
import { PaginatedCallsResponseType } from '../../interfaces/call';

export const PAGINATED_CALLS: TypedDocumentNode<
  PaginatedCallsResponseType,
  { offset: number; limit: number }
> = gql`
  ${CALL_FIELDS}
  query PaginatedCalls($offset: Float!, $limit: Float!) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        ...CallFields
      }
      totalCount
      hasNextPage
    }
  }
`;
