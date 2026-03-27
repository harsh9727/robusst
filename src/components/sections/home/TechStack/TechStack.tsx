"use client";

import React, { useState, memo } from "react";
import type { TechStackSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

const sections = [
  {
    id: "aiTool",
    title: "AI Tools",
    tools: [
      { title: "Gemini", icon: "/techstack/ai/gemini.webp" },
      { title: "ChatGPT", icon: "/techstack/ai/chatgpt.webp" },
      { title: "PaLM", icon: "/techstack/ai/plam.webp" },
      { title: "Claude", icon: "/techstack/ai/calude.webp" },
      { title: "Vicon", icon: "/techstack/ai/vicon.webp" },
      { title: "Mistral", icon: "/techstack/ai/mistral.webp" },
      { title: "Whisper", icon: "/techstack/ai/whisper.webp" },
      { title: "LLaMA", icon: "/techstack/ai/llama.webp" },
    ],
  },
  {
    id: "programmingLanguages",
    title: "Programming Languages",
    tools: [
      { title: "Python", icon: "/techstack/lang/py.webp" },
      { title: "Java", icon: "/techstack/lang/java.webp" },
      { title: "NodeJs", icon: "/techstack/lang/node.webp" },
      { title: "Go", icon: "/techstack/lang/go.webp" },
      { title: "Rust", icon: "/techstack/lang/rust.webp" },
      { title: "ReactJs", icon: "/techstack/lang/react.webp" },
      { title: "Angular", icon: "/techstack/lang/angular.webp" },
      { title: "NextJs", icon: "/techstack/lang/next.webp" },
      { title: "JavaScript", icon: "/techstack/lang/js.webp" },
      { title: "PHP", icon: "/techstack/lang/php.webp" },
      { title: "TS", icon: "/techstack/lang/ts.webp" },
      { title: "Ruby", icon: "/techstack/lang/ruby.webp" },
      { title: "C#", icon: "/techstack/lang/c_sharp.webp" },
    ],
  },
  {
    id: "mobileAppDevelopment",
    title: "Mobile App Development",
    tools: [
      { title: "Swift", icon: "/techstack/mobile/swift.webp" },
      { title: "Kotlin", icon: "/techstack/mobile/kotlin.webp" },
      { title: "Flutter", icon: "/techstack/mobile/futter.webp" },
      { title: "React Native", icon: "/techstack/mobile/react_native.webp" },
    ],
  },
  {
    id: "database",
    title: "Database",
    tools: [
      { title: "MySQL", icon: "/techstack/db/mysql.webp" },
      { title: "PostgreSQL", icon: "/techstack/db/postgresql.webp" },
      { title: "MongoDB", icon: "/techstack/db/mongo.webp" },
      { title: "SQLite", icon: "/techstack/db/sqlite.webp" },
      { title: "MariaDB", icon: "/techstack/db/maria.webp" },
      { title: "Oracle DB", icon: "/techstack/db/oracle.webp" },
      { title: "Cassandra", icon: "/techstack/db/cassandra.webp" },
      { title: "Microsoft SQL Server", icon: "/techstack/db/mssql.webp" },
    ],
  },
  {
    id: "cloudDevOps",
    title: "Cloud & DevOps",
    tools: [
      { title: "AWS", icon: "/techstack/cloud/aws.webp" },
      { title: "Azure", icon: "/techstack/cloud/azure.webp" },
      { title: "GCP", icon: "/techstack/cloud/gcp.webp" },
      { title: "Chef", icon: "/techstack/cloud/chef.webp" },
      { title: "App Engine", icon: "/techstack/cloud/app_engine.webp" },
      { title: "AWS Lambda", icon: "/techstack/cloud/lambda.webp" },
      { title: "Kubernetes", icon: "/techstack/cloud/kuber.webp" },
      { title: "Informatica", icon: "/techstack/cloud/informatica.webp" },
    ],
  },
  {
    id: "integrationDeployment",
    title: "Integration & Deployment",
    tools: [
      {
        title: "MAP",
        icon: "/techstack/integration/mulesoft.webp",
      },
      { title: "Workato", icon: "/techstack/integration/workato.webp" },
      { title: "Snap Logic", icon: "/techstack/integration/snap.webp" },
      { title: "SAP", icon: "/techstack/integration/sap.webp" },
      { title: "GitLab CI/CD", icon: "/techstack/integration/gitlab.webp" },
      { title: "Circle CI", icon: "/techstack/integration/circle_ci.webp" },
      { title: "Argo CD", icon: "/techstack/integration/argo.webp" },
      { title: "Spinnaker", icon: "/techstack/integration/spinnaker.webp" },
    ],
  },
  {
    id: "visualizationTools",
    title: "Visualization Tools",
    tools: [
      { title: "Power BI", icon: "/techstack/data/powerbi.webp" },
      { title: "Grafana", icon: "/techstack/data/frafana.webp" },
      { title: "Tableau", icon: "/techstack/data/tableau.webp" },
      { title: "TensorFlow", icon: "/techstack/data/tf.webp" },
    ],
  },
  {
    id: "cms",
    title: "CMS",
    tools: [
      { title: "Drupal", icon: "/techstack/cms/drupal.webp" },
      { title: "Wordpress", icon: "/techstack/cms/wp.webp" },
      { title: "Joomla", icon: "/techstack/cms/joomla.webp" },
      { title: "Magento", icon: "/techstack/cms/magneto.webp" },
      { title: "Shopify", icon: "/techstack/cms/shopify.webp" },
      { title: "WooCommerce", icon: "/techstack/cms/woo.webp" },
    ],
  },
  {
    id: "erpCrm",
    title: "ERP & CRM",
    tools: [
      { title: "ERP & CRM", icon: "/techstack/erp/erp_and_crm.webp" },
      { title: "Odoo", icon: "/techstack/erp/odoo.webp" },
      { title: "Salesforce", icon: "/techstack/erp/sf.webp" },
      { title: "Service Now", icon: "/techstack/erp/servicenow.webp" },
      { title: "SAP", icon: "/techstack/erp/sap.webp" },
    ],
  },
];

const TechStackInner: React.FC = () => {
  const [activeTool, setActiveTool] = useState(sections[0]?.id ?? "");

  const t = useTranslations();
  const techStackSection = t.raw("techStack") as TechStackSection;

  const activeSection = sections.find((section) => section.id === activeTool);

  return (
    <div className="z-10 flex flex-col gap-8 sm:gap-10 lg:gap-14">
      <p className="text-primary-foreground text-center text-2xl font-black sm:text-3xl lg:text-5xl">
        {techStackSection.heading}
      </p>

      {/* Tabs */}
      <section className="flex flex-wrap items-center justify-center gap-3">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeTool === section.id ? "secondary" : "default"}
            className="flex items-center gap-2"
            onClick={() => setActiveTool(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </section>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTool}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {activeSection?.tools.map((tool) => (
            <motion.div
              key={tool.title}
              layout
              // whileHover={{ scale: 1.05 }}
              // transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="shadow-brand-one flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-white/40 bg-black p-4 text-white shadow-[0_0_0] duration-150 hover:shadow-[0_0_30px]"
            >
              <Image
                src={tool.icon}
                alt={tool.title}
                width={80}
                height={80}
                className="rounded-lg object-contain"
              />
              <span className="text-sm">{tool.title}</span>
            </motion.div>
          ))}
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export const TechStack = memo(TechStackInner);
TechStack.displayName = "TechStack";
