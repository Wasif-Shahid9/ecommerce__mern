import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  newReviewAction,
  NEW_REVIEW_RESET,
  clearErrors,
} from "../../redux/reducersFun/reviewReducer/reviewReducer";
import { getproductAction } from "../../redux/reducersFun/productReducer";
export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.newReviewReducer);
  ("sueecees", success);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reviewSubmitHandler = () => {
    ("The Reivew Submited");
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReviewAction(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getproductAction(id));
  }, [dispatch, error, id, success]);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Submit Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h1 className="text-center mt-5 font-bold">Submit Review</h1>

        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          type="text"
          className="m-5 p-5 border"
          placeholder="Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={reviewSubmitHandler} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
