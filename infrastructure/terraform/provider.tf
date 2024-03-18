# setup the GCP provider | provider.tf

terraform {
  required_providers {
    google = {
      version = "5.6.0"
      source = "hashicorp/google"
    }
  }
}


provider "google" {
  project = var.app_project
  credentials = file(var.gcp_auth_file)
  region  = var.gcp_region_1
  zone    = var.gcp_zone_1
}
