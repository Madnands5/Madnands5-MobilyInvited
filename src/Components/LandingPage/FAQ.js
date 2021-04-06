import React from "react";
import { Grid } from "@material-ui/core";
import BlockTitle from "./BlockTitle";
import AccordionItem from "./AccordionItem";
import faqBG from "../../Assets/shapes/faq-bg-1-1.png";

const FAQ = (props) => {
  return (
    <section className="faq-one">
      <img src={faqBG} className="faq-one__bg-shape-1" alt="" />
      <Grid container spacing={0}>
        <BlockTitle
          textAlign="center"
          paraText="Frequently Asked Questions"
          titleText={`Want to Ask Something \n From Mobilly Invite?`}
        />
        <div className="accrodion-grp faq-accrodion">
          <AccordionItem
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet."
            status={false}
          />
          <AccordionItem
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet."
            status={true}
          />
          <AccordionItem
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet."
            status={false}
          />
          <AccordionItem
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            content="There are many variations of passages of available but
                    majority have alteration in some by inject humour or random
                    words. Lorem ipsum dolor sit amet."
            status={false}
          />
        </div>
      </Grid>
    </section>
  );
};

export default FAQ;
