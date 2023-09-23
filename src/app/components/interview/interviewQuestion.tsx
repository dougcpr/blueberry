import React, {FC} from "react";
import Typography from '@mui/material/Typography';

type InterviewCardProps = {
  interviewQuestion: string | undefined;
};

const InterviewQuestion: FC<InterviewCardProps> = ({interviewQuestion}) => {
  return (
    <Typography variant="body2">
      {interviewQuestion}
    </Typography>
  )
}

export default InterviewQuestion