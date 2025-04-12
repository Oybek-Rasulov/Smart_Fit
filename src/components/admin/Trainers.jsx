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
  
  export default function Trainers({ title, trainers }) {
    const mockTrainers = trainers || [];
    console.log(mockTrainers);
  
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
                <TableCell>Age</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>Instagram</TableCell>
                <TableCell>Telegram</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Languages</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTrainers.map((trainer, index) => {
                const createdAt = new Date(trainer.created_at);
                const formattedDate = createdAt.toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                });
  
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar src={trainer.image} alt={trainer.name} />
                    </TableCell>
                    <TableCell>{trainer.name}</TableCell>
                    <TableCell>{trainer.age}</TableCell>
                    <TableCell>{trainer.experience} years</TableCell>
                    <TableCell>{trainer.students}</TableCell>
                    <TableCell>{trainer.gender}</TableCell>
                    <TableCell>{trainer.bio}</TableCell>
                    <TableCell>{trainer.instagram}</TableCell>
                    <TableCell>{trainer.telegram}</TableCell>
                    <TableCell>
                      <a href={trainer.image} target="_blank" rel="noopener noreferrer">Profile Image</a>
                    </TableCell>
                    <TableCell>{trainer.status ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>
                      {trainer.uzb ? 'Uzbek' : ''}
                      {trainer.rus ? ' Russian' : ''}
                    </TableCell>
                    <TableCell>{trainer.phone}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  