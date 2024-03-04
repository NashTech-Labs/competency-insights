#Terraform plugin for creating random ids
resource "random_id" "instance_id" {
 byte_length = 4
}

#-----------------------pub sub--------------------------------
resource "google_pubsub_topic" "nasher-info" {
  name = "nasher.info"
}

#-----------------------GKE Cluster for applications----------------------------
resource "google_container_cluster" "competency-insights-cluster" {
  name     = "competency-insights-cluster"
  location = var.gcp_region_1
  ip_allocation_policy {
    cluster_ipv4_cidr_block  = ""
    services_ipv4_cidr_block = ""
  }
  enable_autopilot = true
  deletion_protection = false
}

#----------------------GCP firestore----------------------------
resource "google_project_service" "firestore" {
  project = var.app_project
  service = "firestore.googleapis.com"
}

resource "google_firestore_database" "firestore_db" {
  project     = var.app_project
  name        = "(default)"
  location_id = var.gcp_region_1
  type        = "FIRESTORE_NATIVE"
  depends_on = [google_project_service.firestore]
}

#----------------Artifact Registry Repository Docker--------------
resource "google_artifact_registry_repository" "competency-insights-repository" {
  location = var.gcp_region_1
  repository_id = "competency-insights-repository"
  description   = "competency-insights docker repository"
  format        = "DOCKER"

  docker_config {
    immutable_tags = false
  }
}
