import { View } from "@tarojs/components";
import { AtButton, AtProgress, AtRadio } from "taro-ui";

import { useEffect, useState } from "react";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import question from "../../data/questions.json";
import Taro from "@tarojs/taro";

/**
 * 答题页面
 */
export default () => {
  // 当前题号
  const [current, setCurrent] = useState<number>(1);
  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question[0]);
  // 题目的选项信息
  const radioOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}.${option.value}`,
      value: option.key,
    };
  });
  // 回答列表
  const [answerList] = useState<string[]>([]);
  // 当前回答
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  /**
   * 当页号改变时同步改变题目和选项
   */
  useEffect(() => {
    setCurrentQuestion(question[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}
      </View>
      <View className="options-wrapper">
        <AtRadio
          options={radioOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            // 记录答案
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < question.length && (
        <AtButton
          type="primary"
          size="normal"
          className="controlBtn"
          circle
          disabled={!currentAnswer}
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          下一题
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          size="normal"
          className="controlBtn"
          circle
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          上一题
        </AtButton>
      )}
      {current == question.length && (
        <AtButton
          type="primary"
          size="normal"
          className="controlBtn"
          circle
          onClick={() => {
            Taro.setStorageSync("answers", answerList);
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}
      <AtProgress percent={current * 10} color="#88619a" className="progress"/>
    </View>
  );
};
