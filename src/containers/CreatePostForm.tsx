import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewPost } from "../services/CRUDServices";
import { successToast } from "../utility/toast";
import { PostType } from "../../types/interfaces";

export const CreatePostForm = () => {
    const initialValues = {
        title: "",
        body: "",
    };
    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    const onSubmit = async (values: PostType) => {
        const paylod = {
            title: values?.title,
            body: values?.body,

        }
        await addNewPost(paylod).then((res) => {
            successToast('Post added successfully')
        }).catch((ex) => {
            debugger;
            throw ex;
        });
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    return (
        <div><form onSubmit={formik.handleSubmit}
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    title*
                </label>
                <input
                    required
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue("title", e.target.value)}
                    value={formik.values.title}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                <p className="text-red-600">{formik.errors.title}</p>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                    Content
                </label>
                <textarea
                    onBlur={formik.handleBlur}
                    onChange={(e) => formik.setFieldValue("body", e.target.value)}
                    value={formik.values.body}
                    id="body"
                    name="body" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={4} />

            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    add
                </button>
            </div>
        </form></div>
    )
}
