import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { RichTextEditor } from "../../../Shared/RichTextEditor";
import { useFormik } from "formik";
import {Post} from "../../../../api"
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./PostForm.form";
import "./PostForm.scss";
import { initial } from "lodash";

const postController = new Post()

export function PostForm(props) {
    const {onClose, onReload, post} = props
    const {accessToken} = useAuth()
   
  const formik = useFormik({
    initialValues: initialValues(post),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await postController.createPost(accessToken, formValue )
        
        onReload()
        onClose()
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });


  const getMiniature = () => {
    if(formik.values.file) {
        return formik.values.miniature 
     }
    return null;
  };

  return (
    <Form className="post-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Título del Post"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="path"
          placeholder="Path del Post"
          onChange={formik.handleChange}
          value={formik.values.path}
          error={formik.errors.path}
        />
      </Form.Group>

      <RichTextEditor
        initialValues={formik.values.content}
        onContentChange={(content) => formik.setFieldValue("content", content)}
      />

      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear post
      </Form.Button>
    </Form>
  );
}

/*
import React, {useCallback, useRef} from "react";
import {Form, Image} from "semantic-ui-react"
import {useDropzone} from 'react-dropzone'
import { Editor } from "@tinymce/tinymce-react";
import "./PostForm.scss";

export function PostForm() {

 const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

    const onDrop = useCallback((acceptedFile)=>{
        const file = acceptedFile[0]
        console.log(file)
    })

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    })

    const getMiniature = () =>{
        return null;
    }

  return (
    <Form className="post-form">
      <Form.Group widths="equal">
        <Form.Input name="title" placeholder="Título del Post" />
        <Form.Input name="path" placeholder="Path del Post" />
      </Form.Group>

      <>
        <Editor
          //apiKey="your-api-key"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />{" "}
        <button onClick={log}>Log editor content</button>
      </>

      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid>
        Crear post
      </Form.Button>
    </Form>
  );
}

*/
