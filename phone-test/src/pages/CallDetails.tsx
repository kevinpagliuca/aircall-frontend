import { useQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { GET_CALL_DETAILS } from '../gql/queries/getCallDetails';
import { Box, Typography } from '@aircall/tractor';
import { formatDate, formatDuration } from '../helpers/dates';
import { APP_ROUTES } from '../routes';

export const CallDetailsPage = () => {
  const { callId } = useParams();
  const { loading, error, data } = useQuery(GET_CALL_DETAILS, {
    skip: !callId,
    variables: { id: callId as string }
  });

  if (loading) return <p>Loading call details...</p>;
  if (error) return <p>ERROR</p>;

  const call = data?.call;

  if (!call || error) return <Navigate to={APP_ROUTES.CALLS_LIST} />;

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Calls Details
      </Typography>
      <Box overflowY="auto" bg="black-a30" p={4} borderRadius={16}>
        <div>{`ID: ${call.id}`}</div>
        <div>{`Type: ${call.call_type}`}</div>
        <div>{`Created at: ${formatDate(call.created_at)}`}</div>
        <div>{`Direction: ${call.direction}`}</div>
        <div>{`From: ${call.from}`}</div>
        <div>{`Duration: ${formatDuration(call.duration / 1000)}`}</div>
        <div>{`Is archived: ${call.is_archived}`}</div>
        <div>{`To: ${call.to}`}</div>
        <div>{`Via: ${call.via}`}</div>
        {call.notes?.map((note, index) => {
          return <div>{`Note ${index + 1}: ${note.content}`}</div>;
        })}
      </Box>
    </>
  );
};
