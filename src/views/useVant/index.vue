<template>
    <div>
        <h1>使用 vant</h1>
        <h3>1.0 使用 vant 中的按钮</h3>
        <van-button type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <h3>2.0 使用单元格</h3>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
        <h3>3.0 icon 图标的使用</h3>
        <van-icon name="cross" />
        <van-icon name="like-o" />
        <div>需求：在使用 vant-cell 时，在左侧的文本前后分别添加一个爱心</div>
        <van-cell>
            <template #title>
                <van-icon name="like-o" />
                单元格
                <van-icon name="like-o" />
            </template>
            <template #default>
                <van-icon name="like-o" />
                右侧内容
                <van-icon name="like-o" />
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
