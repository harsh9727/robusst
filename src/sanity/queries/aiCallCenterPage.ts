import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const aiCallCenterPageQuery = defineQuery(`
  *[_type == "aiCallCenterPage" && language == $locale][0]{
    ...,
    "banner": banner->content,
    "businessProblem": businessProblem->content,
    "solutionOverview": solutionOverview->content,
    "keyValueProposition": keyValueProposition->content,
    "coreCapabilities": coreCapabilities->content,
    "advancedAiIntelligence": advancedAiIntelligence->content,
    "enterpriseArchitecture": enterpriseArchitecture->content,
    "solutionGrid": solutionGrid->content,
    "customDevelopment": customDevelopment->content,
    "idealUseCases": idealUseCases->content,
    "futureAutomation": futureAutomation->content,
    "faq": faq->content
  }{
    "aiCallPage": {
      "banner": {
        "image": banner.image.image.asset->url,
        "imageAlt": banner.image.alt,
        "title": banner.title,
        "subtitle": banner.subtitle,
        "description": banner.description
      },
      "businessProblem": {
        "title": businessProblem.title,
        "subtitle": businessProblem.subtitle,
        "videoThumbnail": businessProblem.image.image.asset->url,
        "videoThumbnailAlt": businessProblem.image.alt,
        "videoId": businessProblem.video.videoId,
        "videoTitle": businessProblem.labels[2],
        "playButtonText": businessProblem.labels[0],
        "closeVideoText": businessProblem.labels[1],
        "problems": businessProblem.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "DollarSign" => "from-pink-500 to-rose-500",
            iconKey == "TrendingUp" => "from-blue-500 to-cyan-500",
            iconKey == "ShieldCheck" => "from-emerald-500 to-teal-500",
            "from-purple-500 to-pink-500"
          )
        }
      },
      "solutionOverview": {
        "title": solutionOverview.title,
        "titleHighlight": solutionOverview.titleHighlight,
        "image": solutionOverview.image.image.asset->url,
        "imageAlt": solutionOverview.image.alt,
        "solutions": solutionOverview.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "PhoneCall" => "text-blue-600 bg-blue-100",
            iconKey == "Route" => "text-emerald-600 bg-emerald-100",
            iconKey == "BarChart3" => "text-purple-600 bg-purple-100",
            "text-pink-600 bg-pink-100"
          )
        }
      },
      "keyValueProposition": {
        "title": keyValueProposition.title,
        "subtitle": keyValueProposition.subtitle,
        "stats": keyValueProposition.statistics[]{
          "number": string(value), suffix, label,
          "color": select(
            value == 70 => "text-blue-500",
            value == 1000 => "text-emerald-400",
            "text-pink-500"
          )
        }
      },
      "coreCapabilities": {
        "title": coreCapabilities.title,
        "subtitle": coreCapabilities.subtitle,
        "leftImage": coreCapabilities.images[0].image.asset->url,
        "leftImageAlt": coreCapabilities.images[0].alt,
        "rightImage": coreCapabilities.images[1].image.asset->url,
        "rightImageAlt": coreCapabilities.images[1].alt,
        "capabilities": coreCapabilities.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "PhoneCall" => "text-blue-600 bg-blue-100",
            iconKey == "Tags" => "text-emerald-600 bg-emerald-100",
            iconKey == "Brain" => "text-pink-600 bg-pink-100",
            iconKey == "Users" => "text-indigo-600 bg-indigo-100",
            iconKey == "FileText" => "text-teal-600 bg-teal-100",
            "text-purple-600 bg-purple-100"
          ),
          "border": select(
            iconKey == "PhoneCall" => "hover:border-blue-300",
            iconKey == "Tags" => "hover:border-emerald-300",
            iconKey == "Brain" => "hover:border-pink-300",
            iconKey == "Users" => "hover:border-indigo-300",
            iconKey == "FileText" => "hover:border-teal-300",
            "hover:border-purple-300"
          )
        }
      },
      "advancedAIIntelligence": {
        "title": advancedAiIntelligence.title,
        "subtitle": advancedAiIntelligence.subtitle,
        "features": advancedAiIntelligence.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "Brain" => "text-blue-400 bg-blue-500/10",
            iconKey == "Database" => "text-emerald-400 bg-emerald-500/10",
            iconKey == "Users" => "text-pink-400 bg-pink-500/10",
            "text-blue-400 bg-blue-500/10"
          ),
          "gradient": select(
            iconKey == "Brain" => "from-blue-400 to-cyan-400",
            iconKey == "Database" => "from-emerald-400 to-teal-400",
            iconKey == "Users" => "from-pink-400 to-rose-400",
            "from-blue-400 to-cyan-400"
          )
        }
      },
      "enterpriseArchitecture": {
        "title": enterpriseArchitecture.title,
        "subtitle": enterpriseArchitecture.subtitle,
        "image": enterpriseArchitecture.image.image.asset->url,
        "imageAlt": enterpriseArchitecture.image.alt,
        "components": enterpriseArchitecture.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "Smartphone" => "text-blue-600 bg-blue-100",
            iconKey == "Cpu" => "text-emerald-600 bg-emerald-100",
            "text-pink-600 bg-pink-100"
          ),
          "border": select(
            iconKey == "Smartphone" => "hover:border-blue-300",
            iconKey == "Cpu" => "hover:border-emerald-300",
            "hover:border-pink-300"
          )
        }
      },
      "solutionGrid": {
        "title": solutionGrid.title,
        "viewDetailsText": solutionGrid.labels[0],
        "whyItMattersText": solutionGrid.labels[1],
        "solutions": solutionGrid.groups[]{
          "acronym": internalName,
          title,
          description,
          "imageSrc": image.image.asset->url,
          "imageAlt": image.alt,
          "detailedContent": {
            subtitle,
            "description": labels[0],
            "whyItMatters": labels[1],
            "sections": items[]{title, description}
          }
        }
      },
      "customDevelopment": {
        "title": customDevelopment.title,
        "subtitle": customDevelopment.subtitle,
        "image": customDevelopment.image.image.asset->url,
        "imageAlt": customDevelopment.image.alt,
        "cta": customDevelopment.primaryCta.link.label,
        "ctaLink": customDevelopment.primaryCta.link.href,
        "features": customDevelopment.items[]{
          "icon": iconKey, title, description,
          "iconStyle": select(
            iconKey == "Wrench" => "text-pink-600 bg-pink-100",
            iconKey == "Sparkles" => "text-blue-600 bg-blue-100",
            "text-emerald-600 bg-emerald-100"
          ),
          "titleColor": select(
            iconKey == "Wrench" => "text-pink-600",
            iconKey == "Sparkles" => "text-blue-600",
            "text-emerald-600"
          )
        }
      },
      "idealUseCases": {
        "title": idealUseCases.title,
        "subtitle": idealUseCases.subtitle,
        "useCases": idealUseCases.items[]{
          "icon": iconKey, title, description,
          "color": select(
            iconKey == "Home" => "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            iconKey == "DollarSign" => "text-pink-400 bg-pink-500/10 border-pink-500/20",
            "text-blue-400 bg-blue-500/10 border-blue-500/20"
          ),
          "glow": select(
            iconKey == "Home" => "group-hover:shadow-emerald-500/20",
            iconKey == "DollarSign" => "group-hover:shadow-pink-500/20",
            "group-hover:shadow-blue-500/20"
          )
        }
      },
      "futureAutomation": {
        "title": futureAutomation.title,
        "description": futureAutomation.description,
        "ctaText": futureAutomation.primaryCta.link.label,
        "ctaLink": futureAutomation.primaryCta.link.href
      },
      "faq": {
        "heading": faq.title,
        "image": faq.image.image.asset->url,
        "imageAlt": faq.image.alt,
        "items": faq.faqs[]{question, "answer": pt::text(answer)}
      }
    },
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "keywords": seo.keywords,
      "socialImage": coalesce(
        seo.socialImage.image.asset->url,
        banner.image.image.asset->url,
        *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url
      ),
      "noIndex": seo.noIndex
    }
  }
`);

export async function getAiCallCenterPage(locale: string) {
  return sanityClient.fetch(
    aiCallCenterPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-aiCallCenterPage-${locale}`],
      },
    },
  );
}
