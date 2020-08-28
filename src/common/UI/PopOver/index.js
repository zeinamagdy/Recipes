import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon } from "react-share";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();

    // const [open, setOpen] = useState(props.open)
    const [anchorEl, setAnchorEl] = useState(props.anchorEl)
    const shareUrl = props.url
    const title = props.title

    const handleClick = (event) => {
        // setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setOpen(false)
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <FacebookShareButton
                        hashtag="React"
                        url={shareUrl}
                        quote={title}
                        onShareWindowClose={handleClose}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        hashtag="React"
                        url={shareUrl}
                        quote={title}
                        onShareWindowClose={handleClose}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                </Typography>
            </Popover>
        </div>
    );
}
