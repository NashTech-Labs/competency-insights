import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonProfile = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="rectangular" width={410} height={100} />
            <Skeleton variant="rounded" width={410} height={60} />
        </Stack>
    </div>
);