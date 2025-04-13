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
    Button,
  } from '@mui/material';
  import axios from 'axios';
  
  export default function TemporaryTrainers({ title, temporaryTrainers }) {
    const mockTemporaryTrainers = temporaryTrainers || [];
  
    // Handle the "Accept" button click to move the trainer to the real trainers table
    const handleAcceptTrainer = async (trainerId) => {
      try {
        const response = await axios.post('https://smartfitbackend.onrender.com/accessTrainer', { trainerId });
        if (response.data.message === 'success') {
          alert('Trainer has been accepted!');
          // Optionally, update the UI by removing the accepted trainer from the list
        }
      } catch (error) {
        console.error('Error accepting trainer:', error);
        alert('Failed to accept the trainer.');
      }
    };
  
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
                <TableCell>Status</TableCell>
                <TableCell>Languages</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTemporaryTrainers.map((trainer, index) => {
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
                    <TableCell>{trainer.status ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>
                      {trainer.uzb ? 'Uzbek' : ''}
                      {trainer.rus ? ' Russian' : ''}
                    </TableCell>
                    <TableCell>{trainer.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAcceptTrainer(trainer.id)}
                      >
                        Accept
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  