import { Modal, Box, TextField, FormControl, InputLabel, MenuItem,Select, Button } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { genre } from "utils/helpers/getGenreFromGenreId";
import { useAppDispatch } from "app/hooks";
import { postTicket } from "./homeSlice";
import customToast from "components/CustomToast/customToast";
import { ToastType } from "components/CustomToast/customToast";
import Textarea from '@mui/joy/Textarea';

interface TicketModalProps {
    open: boolean;
    handleClose: (isOpen: boolean) => void;
    setOpen: (isOpen: boolean) => void;
}

interface FormData {
    original_title: string;
    genre: string;
    release_date: string;
    price: string;
    seat: string;
    location: string;
    overview: string;
    type: string;
    image: File | null; // Assuming image is of type File or null
  }

export const TicketModal = (props: TicketModalProps) => {
    const {
        open,
        handleClose,
        setOpen
    } = props
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<FormData>({
        original_title: '',
        genre: '',
        release_date: '2024-19-04',
        overview: "",
        price: '',
        seat: '',
        location: '',
        type: '',
        image: null,
      });
    const handleSubmit = async(event: any) => {
            event.preventDefault();
            const res: any = await dispatch(postTicket(formData)).unwrap();
            const { success, message } = res;
            if (success) {
            customToast(ToastType.SUCCESS, message);
            setOpen(false)
        } else {
            customToast(ToastType.ERROR, message);
        }
        // alert("You Must Be A Membership To Start Selling Tickets")
    }
    const handleChange = (event: any) => {
      const file = event.target.files && event.target.files[0];
      setFormData({
          ...formData,
          [event.target.name]: event.target.value,
          overview: event.target.value,
          image: file || null
        });      
    }
    return(
        <Modal  
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{   
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }} >
        <h2 style={{fontSize: 24, textAlign: 'center'}}>Fill In Ticket Information</h2>
        <form onSubmit={handleSubmit} style={{
             display: "flex",
             flexDirection: "column",
             justifyContent: "space-evenly",
        }}>
            <TextField
              label="Name"
              style={{marginTop: 10, marginBottom: 10}}
              name="original_title"
              value={formData.original_title}
              onChange={handleChange}
              required
            />
            <FormControl>
              <InputLabel>Genre</InputLabel>
              <Select
                name="genre"
                style={{marginTop: 10, marginBottom: 10}}
                value={formData.genre}
                onChange={handleChange}
                required
              >
                {genre.slice(3,-1).map((value)=>{
                    return(
                        <MenuItem value={value.name}>{value.name}</MenuItem>
                    )
                })}
              </Select>
            </FormControl>
            <TextField
              label="Date"
              name="date"
              style={{marginTop: 10, marginBottom: 10}}
              type="date"
              value={formData.release_date}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              style={{marginTop: 10, marginBottom: 10}}
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <TextField
              label="Seat"
              name="seat"
              style={{marginTop: 10, marginBottom: 10}}
              value={formData.seat}
              onChange={handleChange}
              required
            />
            <TextField
              label="Location"
              name="location"
              style={{marginTop: 10, marginBottom: 10}}
              value={formData.location}
              onChange={handleChange}
              required
            />
            <TextField
              label="Type"
              name="type"
              style={{marginTop: 10, marginBottom: 10}}
              value={formData.type}
              onChange={handleChange}
              required
              select
            >
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="concert">Concert</MenuItem>
              <MenuItem value="fan-meeting">Fan Meeting</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </TextField>
            
            <Textarea 
              placeholder="Event overview..."   
              style={{marginTop: 10, marginBottom: 10, height: 150}} 
              required 
              onChange={handleChange} 
            />
            <input
                type="file"
                name="file"
                accept="image/*"
                id="image-upload"
                hidden
                onChange={handleChange}
            />
            <label htmlFor="image-upload">
            <Button component="span" variant="contained" color="primary" style={{ width: 200, height: 50, marginRight: 10 }}>
                <UploadFileIcon style={{ marginRight: 5 }} />
                Choose Image
            </Button>
            {formData.image && formData.image.name && (
                <span>{formData.image.name}</span>
            )}
            </label>

            
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button type="submit" variant="contained" style={{width: 130, height: 40}}>
                <SendIcon style={{marginRight: 5}} />
                Submit
                </Button>
            </div>
          </form>
        </Box>
      </Modal>
    )
}

export default TicketModal