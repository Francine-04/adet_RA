import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FaHome, FaSearch, FaVideo, FaUserFriends, FaPlusCircle, FaHeart, FaShare } from "react-icons/fa";
import "./InstagramClone.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([
    { username: "john_doe", avatar: "https://img1.wsimg.com/isteam/ip/175fa811-14be-4397-ab26-16f54c04d81d/0BBAEB6F-C01A-4402-82EB-E8602115EDE6.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,cg:true" },
    { username: "mary_jane", avatar: "https://qph.cf2.quoracdn.net/main-qimg-93e36745040bb292594fd7e58c254d93.webp" },
    { username: "peter_parker", avatar: "https://www.usatoday.com/gcdn/-mm-/c82f9317a54f8a205f711b7b36676f2b55404953/c=1569-99-2272-1036/local/-/media/2017/06/26/USATODAY/USATODAY/636340759929048028-XXX-SPIDER-MAN-HOMECOMING-87249008.JPG" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decodedToken = JSON.parse(token);
        setUser(decodedToken.data);
      } catch (error) {
        console.error("Error parsing token", error);
        navigate("/login");
      }
    }

    // Mock posts
    setPosts([
      { id: 1, username: "john_doe", img: "https://media.tenor.com/DM7SdBiQKhEAAAAM/cat-underwater.gif", likes: 0 },
      { id: 2, username: "mary_jane", img: "https://handluggageonly.co.uk/wp-content/uploads/2023/10/Best-Things-To-Do-In-Paris-France-7.jpg", likes: 0 },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddStory = () => {
    if (user) {
      setStories((prevStories) => [
        ...prevStories,
        { username: user.username, avatar: "https://via.placeholder.com/100" },
      ]);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes === 0 ? 1 : 0 } : post
    ));
  };

  const handleShare = (postId) => {
    alert(`Post ${postId} shared!`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">InstaCam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Button onClick={handleLogout} variant="outline-danger" className="ms-auto">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="dashboard-container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <button>
            <FaHome /> Home
          </button>
          <button>
            <FaSearch /> Search
          </button>
          <button>
            <FaVideo /> Reels
          </button>
          <button>
            <FaUserFriends /> Messages
          </button>
          <button>
            <FaPlusCircle /> Create
          </button>
        </div>

        {/* Center Feed */}
        <div className="feed">
          {/* Stories Section */}
          <div className="stories">
            <Button
              variant="outline-primary"
              onClick={handleAddStory}
              className="add-story-btn"
            >
              + Add Story
            </Button>
            {stories.map((story, index) => (
              <div key={index} className="story">
                <img src={story.avatar} alt={story.username} className="story-img" />
                <span>{story.username}</span>
              </div>
            ))}
          </div>

          {/* Posts Section */}
          {posts.map((post) => (
            <Card className="mb-3" key={post.id}>
              <Card.Header>
                <strong>@{post.username}</strong>
              </Card.Header>
              <Card.Img variant="top" src={post.img} alt="Post" />
              <Card.Body>
                <div className="post-actions">
                  <Button variant="outline-danger" onClick={() => handleLike(post.id)} className="me-2">
                    <FaHeart /> {post.likes === 0 ? "Like" : "Unlike"}
                  </Button>
                  <Button variant="outline-primary" onClick={() => handleShare(post.id)}>
                    <FaShare /> Share
                  </Button>
                </div>
                <Form
                  className="mt-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const comment = e.target.elements.comment.value;
                    setPosts(posts.map(p =>
                      p.id === post.id
                        ? { ...p, comments: [...(p.comments || []), comment] }
                        : p
                    ));
                    e.target.reset();
                  }}
                >
                  <Form.Control
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                    className="rounded-pill"
                  />
                </Form>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="suggestions">
          <h5>Suggested for you</h5>
          <div className="user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmk1tq3ECoWB0FhfIfcWd_IerUw5TCWA6K1Q&s" alt="user" />
            <span>nicole_renats</span>
          </div>
          <div className="user">
            <img src="https://hips.hearstapps.com/hmg-prod/images/anthony-perkins-gettyimages-1098094110.jpg" alt="user" />
            <span>george_enzo</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
