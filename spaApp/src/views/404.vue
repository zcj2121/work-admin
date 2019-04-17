<template>
  <div style="background:#f0f2f5;margin-top: -20px;height:100%;">
    <div class="wscn-http404">
      <div class="pic-404">
        <div class="color-404">
          404
          <div class="not-404">NOT FOUND</div>
        </div>
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">访问错误</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确<p>请点击以下按钮返回</p></div>
        <a href="/" class="bullshit__return-home">返 回</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    computed: {
      message() {
        return '这个页面你不能进......'
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .wscn-http404 {
    position: relative;
    width: 1200px;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      height: 600px;
      padding: 150px 0;
      overflow: hidden;
      text-align: center;
      .color-404 {
        color: #dfaa9c;
        font-size: 200px;
        height: 200px;
        line-height: 150px;
        position: absolute;
        top: 200px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 0.2s;
        .not-404 {
          color: #543c2f;
          font-size: 30px;
          position: absolute;
          top: 110px;
          text-align: center;
          left: 80px;
        }
      }

      @keyframes cloudLeft {
        0% {
          left: 60px;
          opacity: 0;
        }
        20% {
          left: 80px;
          opacity: 1;
        }
        80% {
          left: 120px;
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 1;
        }
      }
    }
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 200px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }

</style>
