package com.hyperlocal.marketplace.repository;

import com.hyperlocal.marketplace.entity.ProviderService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderServiceRepository extends JpaRepository<ProviderService, Long> {}