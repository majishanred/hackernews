import {Box, Stack} from "@mui/material";
import StyledCommentaryBlock from "../styled/StyledCommentaryBlock.tsx";
import {useState} from "react";

type CommentaryProps = {
    commentId: number;
    isExpanded?: boolean;
}

export const Commentary = ({ commentId, isExpanded = false}: CommentaryProps) => {
    const [expanded, setExpanded] = useState(isExpanded);

    return <Stack onClick={() => setExpanded(true)}>
        <Box>
            <span>By: {data.by}</span>
            <p>{data.text}</p>
        </Box>
        { expanded && <StyledCommentaryBlock>{data.kids.map(commentId => <Commentary commentId={commentId}/>)}</StyledCommentaryBlock> }
    </Stack>;
}