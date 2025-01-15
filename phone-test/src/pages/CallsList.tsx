import { useQuery, useSubscription } from '@apollo/client';
import styled from 'styled-components';
import { PAGINATED_CALLS } from '../gql/queries';
import { Typography, Spacer, Pagination, Grid, Flex, FormItem } from '@aircall/tractor';
import { useMemo, useState } from 'react';
import { ON_UPDATED_CALL } from '../gql/subscriptions';
import { CallCard, CallCardSkeleton } from '../components/CallCard';
import { usePaginationParams } from '../hooks/usePaginationParams';
import { Select as AppSelect } from '../components/Select';

export const PaginationWrapper = styled.div`
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const DEFAULT_PAGE_SIZE = 5;

export const CallsListPage = () => {
  useSubscription(ON_UPDATED_CALL);
  const [callType, setCallType] = useState('');
  const [callDirection, setCallDirection] = useState('');

  const { activePage, onPageChange, activePageSize, onPageSizeChange } = usePaginationParams({
    defaults: { pageSize: DEFAULT_PAGE_SIZE }
  });

  const { loading, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * activePageSize,
      limit: activePageSize
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

  const dataFiltered = calls.filter(item => {
    const directionMatches =
      !callDirection || callDirection === 'all' || callDirection === item.direction;
    const typeMatches = !callType || callType === 'all' || callType === item.call_type;

    return directionMatches && typeMatches;
  });

  return (
    <Grid gap={6}>
      <Typography variant="displayM">Calls History</Typography>

      <Flex flexDirection="column" spaceY={4}>
        <Typography variant="displayS" w="100%">
          Filters
        </Typography>

        <Grid gridTemplateColumns={2} gap={4}>
          <FormItem label="Call type">
            <AppSelect
              value={callType}
              onValueChange={value => setCallType(value === 'all' ? '' : value)}
              placeholder="Pick a option"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Missed', value: 'missed' },
                { label: 'Answered', value: 'answered' },
                { label: 'Voicemail', value: 'voicemail' }
              ]}
            />
          </FormItem>
          <FormItem label="Call direction">
            <AppSelect
              value={callDirection}
              onValueChange={value => setCallDirection(value === 'all' ? '' : value)}
              placeholder="Pick a option"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Inbound', value: 'inbound' },
                { label: 'Outbound', value: 'outbound' }
              ]}
            />
          </FormItem>
        </Grid>
      </Flex>

      <Spacer space={4} direction="vertical" w="100%">
        {loading &&
          Array.from({ length: activePageSize }).map((_, item) => <CallCardSkeleton key={item} />)}

        {dataFiltered?.map(call => (
          <CallCard key={call.id} call={call} />
        ))}
      </Spacer>
      {!!totalCount && (
        <PaginationWrapper>
          <Pagination
            activePage={activePage}
            onPageChange={onPageChange}
            pageSize={activePageSize}
            onPageSizeChange={onPageSizeChange}
            recordsTotalCount={totalCount}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            defaultActivePage={1}
            pageSizeOptions={Array.from({ length: 6 }).map((_, index) => {
              return {
                value: DEFAULT_PAGE_SIZE * (index + 1),
                label: String(DEFAULT_PAGE_SIZE * (index + 1))
              };
            })}
          />
        </PaginationWrapper>
      )}
    </Grid>
  );
};
