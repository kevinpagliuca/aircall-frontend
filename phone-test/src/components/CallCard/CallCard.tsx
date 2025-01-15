import {
  ArchiveFilled,
  ArchiveOutlined,
  Box,
  DiagonalDownOutlined,
  DiagonalUpOutlined,
  Flex,
  Grid,
  Link,
  PlusOutlined,
  Typography
} from '@aircall/tractor';
import { Call } from '../../interfaces/call';

import { formatDate, formatDuration } from '../../helpers/dates';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes';
import { useState } from 'react';
import { AddNoteModal } from './AddNoteModal';

type Props = {
  call: Call;
};

const CallCard = ({ call }: Props) => {
  const navigate = useNavigate();
  const [addNoteIsOpen, setAddNoteIsOpen] = useState(false);

  const DirectionIcon = call.direction === 'inbound' ? DiagonalDownOutlined : DiagonalUpOutlined;
  const ArchiveIcon = call.is_archived ? ArchiveFilled : ArchiveOutlined;

  const getCallTitle = () => {
    switch (call.call_type) {
      case 'missed': {
        return 'Missed call';
      }
      case 'answered': {
        return 'Call answered';
      }
      default: {
        return 'Voicemail';
      }
    }
  };

  return (
    <>
      <Box
        key={call.id}
        bg="black-a30"
        borderRadius={16}
        cursor="pointer"
        onClick={() => navigate(APP_ROUTES.CALL_DETAILS(call.id))}
      >
        <Grid
          gridTemplateColumns="32px 1fr max-content"
          columnGap={2}
          borderBottom="1px solid"
          borderBottomColor="neutral-700"
          alignItems="center"
          px={4}
          py={2}
        >
          <Box>
            <DirectionIcon size={32} />
          </Box>
          <Box>
            <Typography variant="body">{getCallTitle()}</Typography>
            <Typography variant="body2">
              {call.direction === 'inbound' ? `from ${call.from}` : `to ${call.to}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" textAlign="right">
              {formatDuration(call.duration / 1000)}
            </Typography>
            <Typography variant="caption">{formatDate(call.created_at)}</Typography>
          </Box>
        </Grid>
        <Box p={4}>
          <Typography variant="caption">Call has {call.notes.length} notes</Typography>
        </Box>

        <Flex spaceX={4} p={4} borderTop="1px solid" borderTopColor="neutral-700">
          <Link
            onClick={e => {
              e.stopPropagation();
              setAddNoteIsOpen(true);
            }}
            color="neutral-300"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.25rem'
            }}
          >
            <ArchiveIcon size={24} />
            {call.is_archived ? `Unarchive` : `Archive`}
          </Link>
          <Link
            onClick={e => {
              e.stopPropagation();
              setAddNoteIsOpen(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.25rem'
            }}
            color="primary-500"
          >
            <PlusOutlined size={24} />
            New note
          </Link>
        </Flex>
      </Box>
      <AddNoteModal
        callId={call.id}
        isOpen={addNoteIsOpen}
        onHide={() => setAddNoteIsOpen(false)}
      />
    </>
  );
};

export default CallCard;
