import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Avatar,
} from '@mui/material';

export default function Users({title, users}) {
  const mockUsers = users || []
  console.log(mockUsers)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#40B93C' }}>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {mockUsers.map((user, index) => {
            const createdAt = new Date(user.created_at);
            const formattedDate = createdAt.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });

            return (
              <TableRow key={index}>
                <TableCell>
                  <Avatar src={user.image} alt={user.name} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
