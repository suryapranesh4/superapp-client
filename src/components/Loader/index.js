import React from "react";
import ReactLoading from "react-loading";
import { Section } from "./generic";
import "./styles.css";

const Loader = () => (
    <Section className="min-h-screen">
        <ReactLoading type="spin" color="#00cc00" />
    </Section>
);

export default Loader;