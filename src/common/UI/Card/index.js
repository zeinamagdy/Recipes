import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import parse from 'html-react-parser';
import ShowMoreText from 'react-show-more-text';
import SimplePopover from '../PopOver'
import styles from './card.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const RecipeReviewCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [showShareIcons, setShowShareIcons] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);



    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    const showShareIconsHandler = (event) => {
        console.log('share');
        setShowShareIcons(true)
        setAnchorEl(event.target)
    }

    // title = "Shrimp and Chorizo Paella"
    console.log('props card', props);
    const cardStyle = [classes.root, styles.margin_30_px]
    return (
        <Card className={cardStyle.join(' ')}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={props.image}
                title={props.title}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">

                    <ShowMoreText
                        lines={2}
                        more='>>'
                        less='<<'
                        anchorClass=''
                        onClick={executeOnClick}
                        expanded={false}

                    >
                        {parse(props.summary)}
                    </ShowMoreText>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon onClick={showShareIconsHandler} />
                </IconButton>
                {showShareIcons ?
                    <span>
                        <SimplePopover open={showShareIcons} anchorEl={anchorEl} url={props.url} title={props.title} />
                    </span> : null}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    {props.steps.map(step => <Typography key={step.number}>{step.step}</Typography>)}
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default RecipeReviewCard