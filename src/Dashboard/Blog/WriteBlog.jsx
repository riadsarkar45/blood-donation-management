import { useContext, useEffect, useRef, useState } from "react";
import UseAxiosPublic from "../../components/Hooks/UseAxiosPublic";
import JoditEditor from 'jodit-react';
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import moment from "moment/moment";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
const WriteBlog = () => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const editor = useRef(null);
    const [content, setContent] = useState('')
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [blocked, setBlocked] = useState([]);

    const { data: users = [],  } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    useEffect(() => {
        const blocked = users?.filter((use) => use?.email === user?.email);
        setBlocked(blocked)
    }, [users, user])

    console.log(status)
    const handleAddBlog = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const title = form.title.value;
        const status = "draft"
        const writtenTime = moment().format("MMM Do YY");
        const writerName = user?.displayName;
        const isPublished = "pending";
        const userEmail = user?.email;
        const userImage = user?.photoURL;
        formData.get('image');
        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const dataToInsert = { title, image: res.data.data.display_url, content, writtenTime, status, writerName, isPublished, userEmail, userImage }
            if (res.data.success) {
                axiosSecure.post('/blogs', dataToInsert)
                    .then(() => {
                        toast.success('Blog Uploaded')
                        form.reset();
                    })

            }

        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>
                    Add New Blog
                </title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Add New Blog</h2>
            </div>
            <div className="mt-10">
                <form onSubmit={handleAddBlog}>
                    <div className="grid grid-cols-2 gap-6 mt-3">
                        <input type="text" name="title" placeholder="Title" className="file-input file-input-bordered w-[26rem]" />
                        <input type="file" name="image" className="file-input file-input-bordered w-[26rem]" />
                    </div>

                    <div className="mt-4 w-[97%]">
                        <JoditEditor

                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}

                        ></JoditEditor>
                    </div>
                    <div className="mt-4">
                        {
                            blocked?.map(user => {
                                if (user.status === 'Blocked') {
                                    toast.error("You are blocked. Blocked users are not allowed to add a blog");
                                    return (
                                        <button key={user._id} disabled type="submit" className="btn btn-success btn-outline">
                                            Add Blog
                                        </button>
                                    );
                                } else {
                                    return (
                                        <button key={user._id} type="submit" className="btn btn-success btn-outline">
                                            Add Blog
                                        </button>
                                    );
                                }
                            })
                        }

                    </div>
                </form>
            </div>
        </div>
    );
};

export default WriteBlog;
