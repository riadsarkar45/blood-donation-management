import useAdmin from '../../components/Hooks/useAdmin';
import { FaGripVertical } from "react-icons/fa";
import { TableCell, TableRow } from "@mui/material";

const ContentTableRow = ({ cont, updateBlogData, handleDeleteBlog }) => {
    const [isAdmin] = useAdmin();
    const { image, title, writtenTime, status, writerName, isPublished, _id } = cont;
    return (


        <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>{writerName}</TableCell>
            <TableCell>{writtenTime}</TableCell>
            <TableCell>
                {
                    isPublished === null ? (
                        <>
                            <div className="badge badge-secondary badge-outline">Not Yet</div>
                        </>
                    ) : (
                        <>
                            <div className="badge badge-accent badge-outline w-[7rem]">{isPublished}</div>
                        </>
                    )
                }
            </TableCell>

            <TableCell>
                {
                    status === 'draft' ? (
                        <>
                            <div className="badge badge-secondary badge-outline">Draft</div>
                        </>
                    ) : (
                        <>
                            <div className="badge badge-accent badge-outline">Published</div>
                        </>
                    )
                }
            </TableCell>

            <TableCell>
                {
                    isAdmin ? (
                        <>
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <label aria-disabled tabIndex={0} className="btn btn-sm"><FaGripVertical /></label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    {
                                        status === 'draft' ? (
                                            <>
                                                <li onClick={() => updateBlogData('publish', _id)}><a>Publish</a></li>

                                            </>
                                        ) : (
                                            <>
                                                <li onClick={() => updateBlogData('draft', _id)}><a>Set To Draft</a></li>
                                            </>
                                        )
                                    }
                                    <li onClick={() => handleDeleteBlog(_id)}><a>Delete</a></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>

                            <button disabled className="btn btn-sm"><FaGripVertical /></button>

                        </>
                    )
                }
            </TableCell>
        </TableRow>




        // <tr>
        //     <th>
        //         <label>
        //             <input type="checkbox" className="checkbox" />
        //         </label>
        //     </th>
        //     <td>
        //         <div className="flex items-center gap-3">
        //             <div className="avatar">
        //                 <div className="mask mask-squircle w-12 h-12">
        //                     <img src={image} alt="Avatar Tailwind CSS Component" />
        //                 </div>
        //             </div>
        //             <div>
        //                 <div className="font-bold">{title}</div>
        //             </div>
        //         </div>
        //     </td>
        //     <td>
        //         {writerName}
        //     </td>
        //     <td>
        //         {writtenTime}
        //     </td>
        //     <td>
        //         {
        //             isPublished === null ? (
        //                 <>
        //                     <div className="badge badge-secondary badge-outline">Not Yet</div>
        //                 </>
        //             ) : (
        //                 <>
        //                     <div className="badge badge-accent badge-outline w-[7rem]">{isPublished}</div>
        //                 </>
        //             )
        //         }
        //     </td>
        //     <td>
        // {
        //     status === 'draft' ? (
        //         <>
        //             <div className="badge badge-secondary badge-outline">Draft</div>
        //         </>
        //     ) : (
        //         <>
        //             <div className="badge badge-accent badge-outline">Published</div>
        //         </>
        //     )
        // }
        //     </td>
        //     <th>
        // {
        //     isAdmin ? (
        //         <>
        //             <div className="dropdown dropdown-bottom dropdown-end">
        //                 <label aria-disabled tabIndex={0} className="btn btn-sm"><FaGripVertical /></label>
        //                 <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        //                     {
        //                         status === 'draft' ? (
        //                             <>
        //                                 <li onClick={() => updateBlogData('publish', _id)}><a>Publish</a></li>

        //                             </>
        //                         ) : (
        //                             <>
        //                                 <li onClick={() => updateBlogData('draft', _id)}><a>Set To Draft</a></li>
        //                             </>
        //                         )
        //                     }
        //                     <li><a>Edit</a></li>
        //                     <li><a>Delete</a></li>
        //                 </ul>
        //             </div>
        //         </>
        //     ) : (
        //         <>

        //             <button disabled className="btn btn-sm"><FaGripVertical /></button>

        //         </>
        //     )
        // }
        //     </th>
        // </tr>
    );
};

export default ContentTableRow;