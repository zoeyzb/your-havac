// Tagged template that returns the query string
const gql = (strings: TemplateStringsArray, ...values: any[]) => strings.reduce((a, s, i) => a + s + (values[i] || ''), '')

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription { processed }
        featuresItems {
          ... on ParagraphFeatureItem {
            id
            title
            description { processed }
            icon
          }
        }
        ctaTitle
        ctaDescription { processed }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

export const GET_SERVICES = gql`
  query GetServices($first: Int = 10) {
    nodeServices(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeService {
          body { processed summary }
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_SERVICE_BY_PATH = gql`
  query GetServiceByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeService {
            id
            title
            path
            body { processed summary }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_SERVICE_AREAS = gql`
  query GetServiceAreas($first: Int = 10) {
    nodeServiceAreas(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        ... on NodeServiceArea {
          body { processed summary }
          zipCodes
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_SERVICE_AREA_BY_PATH = gql`
  query GetServiceAreaByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeServiceArea {
            id
            title
            path
            body { processed summary }
            zipCodes
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_TESTIMONIALS = gql`
  query GetTestimonials($first: Int = 10) {
    nodeTestimonials(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        ... on NodeTestimonial {
          body { processed summary }
          clientName
          serviceReceived
          rating
          photo {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_TESTIMONIAL_BY_PATH = gql`
  query GetTestimonialByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeTestimonial {
            id
            title
            path
            body { processed summary }
            clientName
            serviceReceived
            rating
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            __typename
            id
            title
            body {
              processed
            }
          }
          ... on NodeService {
            __typename
            id
            title
            body {
              processed
            }
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
          ... on NodeServiceArea {
            __typename
            id
            title
            body {
              processed
            }
            zipCodes
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
          ... on NodeTestimonial {
            __typename
            id
            title
            body {
              processed
            }
            clientName
            serviceReceived
            rating
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM, THUMBNAIL]) {
                name
                url
                width
                height
              }
            }
          }
          ... on NodeHomepage {
            __typename
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            featuresItems {
              ... on ParagraphFeatureItem {
                id
                title
                description {
                  processed
                }
                icon
              }
            }
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`
