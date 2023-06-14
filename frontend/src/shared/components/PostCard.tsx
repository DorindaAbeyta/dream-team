import {Button, Card} from "react-bootstrap";
import {Post} from "../interfaces/Post.tsx";
import {useGetProfileByProfileIdQuery, useGetVotesByVotePostIdQuery, useToggleVoteMutation} from "../../store/apis";
import {CategoryTag} from "./tags/Tags";

interface Props {
    post: Post
}
export function PostCard(props: Props) {
    const { post } = props
    const [submitVote] = useToggleVoteMutation()
    const { data: profile, isLoading} = useGetProfileByProfileIdQuery(post.postProfileId)
    console.log(profile)
    const { data: vote, isLoading: voteIsLoading, refetch } = useGetVotesByVotePostIdQuery(post.postProfileId)
    const clickVoteUp = async () => {
        await submitVote({votePostId: post.postId, voteValue: false})
        await refetch()
    }
    const clickVoteDown = async () => {
        await submitVote({votePostId: post.postId, voteValue: true})
        await refetch()
    }

    if(isLoading || profile === undefined) {
        return <></>
    }
    if(voteIsLoading || vote === undefined) {
        return <></>
    }
    if (profile === null) {
        return (<></>)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{profile.profileHandle}</Card.Title>
                    <Card.Title>{post.postTitle}</Card.Title>
                    <Card.Text as={"div"}>
                        {post.postContent}
                    </Card.Text>
                    <CategoryTag postId={post.postId}/>
                    <br></br>
                    <Button onClick={clickVoteUp}>{vote.length}<span role="icon" aria-label="up vote">Up</span></Button>
                    <Button onClick={clickVoteDown}>{vote.length}<span role="icon" aria-label="down vote">Down</span></Button>
                    {new Date(post.postDateTime).toLocaleString()}
                </Card.Body>
            </Card>
        </>
    )
}