import React from "react";
import Layout from "../components/Layout";
import { LINKS } from "../const/LINKS.const";

const Links = () => {
  return (
    <Layout pageTitle="Liens">
      <div className="min-h-[calc(100vh-8rem)] flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bebas tracking-wider text-white">
                  Liens
                </h1>
                <p className="text-gray-400">
                  Découvrez nos liens pour suivre CDTarget sur les réseaux
                  sociaux.
                </p>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              {LINKS.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center  p-4 bg-[#202123] rounded-lg text-[#009B70] gap-4 justify-center hover:bg-[#009B70] hover:text-[#202123] transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <span className="">{link.icon}</span>
                  <span className="flex items-center justify-center  ">
                    {link.url}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Links;
