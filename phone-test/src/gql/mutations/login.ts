import { gql, TypedDocumentNode } from '@apollo/client';
import { USER_FIELDS } from '../fragments/user';
import { AuthResponseType, LoginInput } from '../../interfaces/auth';

export const LOGIN: TypedDocumentNode<{ login: AuthResponseType }, { input: LoginInput }> = gql`
  ${USER_FIELDS}

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        ...UserFields
      }
    }
  }
`;
