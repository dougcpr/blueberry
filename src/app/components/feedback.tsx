import React, {FC} from "react";
import Typography from "@mui/material/Typography";

type FeedbackProps = {
  feedback: string | undefined;
};

const Feedback: FC<FeedbackProps> = ({feedback}) => {

  return (
    <div>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Feedback
      </Typography>
      <Typography variant="body2">
        {feedback}
      </Typography>
    </div>
  )
}

export default Feedback