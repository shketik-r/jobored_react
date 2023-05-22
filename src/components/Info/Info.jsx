import s from "./Info.module.css";
import { Card } from "@mantine/core";

function Info(props) {
    

  function createMarkup() {
    return { __html: props.info[0].vacancyRichText };
  }
  return (
    <Card
    padding="md"
    radius="md"
    withBorder
    >
      <div className={s.text_info} dangerouslySetInnerHTML={createMarkup()} />
    </Card>
  );
}

export default Info;
