import React, { useCallback, useState } from 'react'
import { ReactTags } from 'react-tag-autocomplete'
import './css/TagsComponent.css';

//タグの型
export type tagType = {
    label: string,
    value: string | number | symbol | null,
}

//引数の型
export type propsType = {
    tagList: tagType[],
    suggestions: tagType[],
    addTag: (newTag: tagType) => void,
    deleteTag: (tagIndex: number) => void,
}

function TagsComponent(props: propsType) {


    return (
        <ReactTags
            selected={props.tagList}
            suggestions={props.suggestions}
            onAdd={props.addTag}
            onDelete={props.deleteTag}
            noOptionsText="No matching countries"
            allowNew
        />
    )
}

export default TagsComponent;