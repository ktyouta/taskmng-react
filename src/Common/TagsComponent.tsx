import React, { useCallback, useState } from 'react'
import { ReactTags } from 'react-tag-autocomplete'
import './css/TagsComponent.css';

//タグの型
type tagType = {
    label: string,
    value: string | number | symbol | null,
}

//引数の型
type propsType = {
    suggestions: tagType[]
}

function TagsComponent(props: propsType) {

    //タグのリスト
    const [selected, setSelected] = useState<tagType[]>([])

    /**
     * タグの追加イベント
     */
    const onAdd = useCallback(
        (newTag: tagType) => {
            setSelected([...selected, newTag])
        },
        [selected]
    )

    /**
     * タグの削除イベント
     */
    const onDelete = useCallback(
        (tagIndex: number) => {
            setSelected(selected.filter((_, i) => i !== tagIndex))
        },
        [selected]
    )

    return (
        <ReactTags
            labelText="Select countries"
            selected={selected}
            suggestions={props.suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching countries"
            allowNew
        />
    )
}

export default TagsComponent;