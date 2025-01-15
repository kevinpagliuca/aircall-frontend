import { gql, TypedDocumentNode } from '@apollo/client';
import { USER_FIELDS } from '../fragments/user';
import { GetMeResponseType } from '../../interfaces/auth';

export const GET_ME_QUERY: TypedDocumentNode<GetMeResponseType> = gql`
  ${USER_FIELDS}

  query Me {
    me {
      ...UserFields
    }
  }
`;
