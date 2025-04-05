import { Image, View } from "@tarojs/components";
import { AtButton, AtToast } from "taro-ui";

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import HeaderBg from "../../assets/headerBg.jpg";
import question from "../../data/questions.json";
import questionResult from "../../data/question_results.json";
import getBestQuestionResult from "../../utils/BizUtil";
/**
 * 主页
 */
export default () => {
  // 答案列表
  const answerList = Taro.getStorageSync("answers");
  const result = getBestQuestionResult(answerList, question, questionResult);
  if (!result) {
    <AtToast isOpened text="出错啦！"></AtToast>;
  }
  return (
    <View className="indexPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h3 subTitle">{result.resultDesc}</View>
      <AtButton
        type="primary"
        size="normal"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <Image src={HeaderBg} style={{ width: "100%" }} mode="aspectFill" />
      <GlobalFooter />
    </View>
  );
};
