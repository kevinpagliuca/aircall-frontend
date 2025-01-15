import { Box, Flex, Grid, Skeleton } from '@aircall/tractor';

const CallCardSkeleton = () => {
  return (
    <Box bg="black-a30" borderRadius={16}>
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
      <Box p={4}>
        <Skeleton shape="square" w={200} h={14} borderRadius={4} mb={1} />
      </Box>
      <Flex spaceX={4} p={4} borderTop="1px solid" borderTopColor="neutral-700">
        <Skeleton shape="square" w={100} h={24} borderRadius={4} />
        <Skeleton shape="square" w={100} h={24} borderRadius={4} />
      </Flex>
    </Box>
  );
};

export default CallCardSkeleton;
