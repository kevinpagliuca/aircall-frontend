import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { PAGINATED_CALLS } from '../gql/queries';
import {
  Grid,
  Icon,
  Typography,
  Spacer,
  Box,
  DiagonalDownOutlined,
  DiagonalUpOutlined,
  Pagination,
  Skeleton
} from '@aircall/tractor';
import { formatDate, formatDuration } from '../helpers/dates';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import { useMemo } from 'react';
import { PaginatedCallsResponseType } from '../interfaces/call';

export const PaginationWrapper = styled.div`
  > div {
    width: inherit;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const CALLS_PER_PAGE = 5;

export const CallsListPage = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const pageQueryParams = search.get('page');
  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;
  const { loading, data } = useQuery<PaginatedCallsResponseType>(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * CALLS_PER_PAGE,
      limit: CALLS_PER_PAGE
    }
  });

  const { totalCount = 0, calls } = useMemo(() => {
    if (!data) return { totalCount: 0, calls: [] };

    return {
      totalCount: data.paginatedCalls.totalCount,
      calls: data.paginatedCalls.nodes
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const handleCallOnClick = (callId: string) => {
    navigate(APP_ROUTES.CALL_DETAILS(callId));
  };

  const handlePageChange = (page: number) => {
    navigate(`/calls/?page=${page}`);
  };

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Calls History
      </Typography>

      <Spacer space={3} direction="vertical">
        {loading
          ? Array.from({ length: CALLS_PER_PAGE }).map((_, item) => (
              <Box key={item} bg="black-a30" borderRadius={16}>
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
                    <Skeleton shape="squircle" w={32} h={32} />
                  </Box>
                  <Box>
                    <Skeleton shape="square" w={100} h={20} borderRadius={4} mb={1} />
                    <Skeleton shape="square" w={140} h={20} borderRadius={4} mb={1} />
                  </Box>
                  <Box>
                    <Skeleton shape="square" w={40} h={14} borderRadius={4} mb={1} ml="auto" />
                    <Skeleton shape="square" w={80} h={14} borderRadius={4} mb={1} />
                  </Box>
                </Grid>
                <Box px={4} py={2}>
                  <Skeleton shape="square" w={200} h={14} borderRadius={4} mb={1} />
                </Box>
              </Box>
            ))
          : calls?.map(call => {
              const icon = call.direction === 'inbound' ? DiagonalDownOutlined : DiagonalUpOutlined;
              const title =
                call.call_type === 'missed'
                  ? 'Missed call'
                  : call.call_type === 'answered'
                  ? 'Call answered'
                  : 'Voicemail';
              const subtitle = call.direction === 'inbound' ? `from ${call.from}` : `to ${call.to}`;
              const duration = formatDuration(call.duration / 1000);
              const date = formatDate(call.created_at);
              const notes = call.notes ? `Call has ${call.notes.length} notes` : <></>;

              return (
                <Box
                  key={call.id}
                  bg="black-a30"
                  borderRadius={16}
                  cursor="pointer"
                  onClick={() => handleCallOnClick(call.id)}
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
                      <Icon component={icon} size={32} />
                    </Box>
                    <Box>
                      <Typography variant="body">{title}</Typography>
                      <Typography variant="body2">{subtitle}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" textAlign="right">
                        {duration}
                      </Typography>
                      <Typography variant="caption">{date}</Typography>
                    </Box>
                  </Grid>
                  <Box px={4} py={2}>
                    <Typography variant="caption">{notes}</Typography>
                  </Box>
                </Box>
              );
            })}
      </Spacer>

      {!!totalCount && (
        <PaginationWrapper>
          <Pagination
            activePage={activePage}
            pageSize={CALLS_PER_PAGE}
            onPageChange={handlePageChange}
            recordsTotalCount={totalCount}
          />
        </PaginationWrapper>
      )}
    </>
  );
};
